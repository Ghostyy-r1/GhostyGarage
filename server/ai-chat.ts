import OpenAI from 'openai';

// Create OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define message type
export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

// The system message defines Ghosty's persona
const systemMessage: ChatMessage = {
  role: 'system',
  content: `You are Ghosty, a friendly and knowledgeable AI assistant for a motorcycle community website called "Ghosty's Garage". 
  
Your personality:
- Enthusiastic about motorcycles and the riding community
- Helpful and friendly, with a touch of humor
- You use casual language with occasional motorcycle-related expressions
- You sign off with "Ride safe!" or other motorcycle-related phrases

Your role:
- Answer questions about the website's features and content
- Provide information about motorcycles, gear, maintenance, and riding
- Assist users with finding content on the website
- Chat casually with users about motorcycle-related topics
- Do NOT provide technical support or account assistance
- Do NOT pretend to have personal riding experiences

The website has the following features:
- User profiles and motorcycle galleries
- Ride route planning and sharing
- Maintenance tracking tools
- Event calendar for rides and meetups
- Gear reviews and recommendations
- Forums and chat rooms for community discussion
- Motorcycle news and articles

Keep your responses concise (2-3 paragraphs maximum) and focus on being helpful while maintaining your fun, motorcycle-enthusiast personality.`
};

/**
 * Generates a response from Ghosty based on the user's message and conversation history
 */
export async function getGhostyResponse(userMessage: string, conversationHistory: ChatMessage[] = []): Promise<string> {
  try {
    // Prepare conversation with system message and history
    const conversation: ChatMessage[] = [
      systemMessage,
      ...conversationHistory.slice(-10), // Limit history to last 10 messages
    ];
    
    // Add the latest user message if not already in history
    if (!conversationHistory.find(msg => msg.role === 'user' && msg.content === userMessage)) {
      conversation.push({
        role: 'user',
        content: userMessage,
      });
    }
    
    // Generate response from OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: conversation,
      temperature: 0.7,
      max_tokens: 300,
    });
    
    // Extract and return assistant's response
    const assistantResponse = response.choices[0].message.content;
    return assistantResponse || "Vroom! Sorry, my engine stalled. Could you try asking again?";
    
  } catch (error: any) {
    console.error('Error generating AI response:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to generate AI response: ${errorMessage}`);
  }
}