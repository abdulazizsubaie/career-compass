import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { answers } = await request.json();

    const prompt = `As a career guidance expert, analyze the following responses from an IT graduate in Riyadh and suggest suitable career paths. Consider the local job market and industry trends.

Responses:
${Object.entries(answers)
  .map(([id, answer]) => `Question ${id}: ${answer}`)
  .join('\n')}

Please provide:
1. Top 3 recommended career paths
2. Key skills to develop for each path
3. Relevant job market insights for Riyadh
4. Suggested learning resources
5. Potential companies to target

Format the response in JSON.`;

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a career guidance expert specializing in the IT industry in Riyadh.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'gpt-4-turbo-preview',
      response_format: { type: 'json_object' },
    });

    const analysis = completion.choices[0].message.content;

    return NextResponse.json(JSON.parse(analysis));
  } catch (error) {
    console.error('Error analyzing assessment:', error);
    return NextResponse.json(
      { error: 'Failed to analyze assessment' },
      { status: 500 }
    );
  }
} 