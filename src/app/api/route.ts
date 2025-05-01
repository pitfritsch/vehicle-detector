import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

const VehicleSchema = z.object({
  brand: z.string(),
  model: z.string(),
  year: z.number(),
  color: z.string(),
});

export type Vehicle = z.infer<typeof VehicleSchema>;

export async function POST(req: Request) {
  const buffer = await req.arrayBuffer();
  const base64Image = Buffer.from(buffer).toString("base64");

  const response = await openai.responses.parse({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: "Extract the vehicle details from the following image, upper case first letter of all properties",
          },
          {
            type: "input_image",
            image_url: `data:image/jpeg;base64,${base64Image}`,
            detail: "low",
          },
        ],
      },
    ],
    text: {
      format: zodTextFormat(VehicleSchema, "car"),
    },
  });

  return Response.json(response.output_parsed);
}
