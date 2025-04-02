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
 * Simple pattern matching for common questions to avoid API calls
 */
function getBasicResponse(userMessage: string): string | null {
  const message = userMessage.toLowerCase().trim();
  
  // Greeting patterns
  if (/^(hi|hello|hey|howdy|greetings|yo|what's up|sup)/i.test(message)) {
    return "Hey there, rider! Welcome to Ghosty's Garage. How can I help you today? Looking for motorcycle advice, routes, or just want to chat about bikes? Vroom vroom! 🏍️";
  }
  
  // How are you patterns
  if (/how are you|how('s| is) it going|how('s| are) things/i.test(message)) {
    return "I'm running on all cylinders today! Thanks for asking. Ready to talk motorcycles or help you find something on our site. What's on your mind?";
  }
  
  // About the website
  if (/about (the|this) (site|website)|what (is|does) this (site|website)/i.test(message)) {
    return "Ghosty's Garage is a community hub for motorcycle enthusiasts! We offer ride route planning, maintenance tracking, gear reviews, event listings, and forums to connect with fellow riders. What aspect would you like to explore first?";
  }
  
  // Motorcycle maintenance
  if (/maintenance|repair|fix|service|oil change/i.test(message)) {
    return "Our maintenance tracker helps you keep your bike in top condition! You can log service history, get reminders for upcoming maintenance, and even share maintenance tips with other riders. Need help with a specific maintenance issue?";
  }
  
  // Routes and riding
  if (/route|ride|riding|trip|journey|travel/i.test(message)) {
    return "The route planner is one of our most popular features! You can discover scenic routes shared by other riders, create your own with waypoints, and even download GPS data for your device. Looking for routes in a specific area?";
  }
  
  // Gear and equipment
  if (/gear|helmet|jacket|gloves|boots|equipment/i.test(message)) {
    return "Our gear section has reviews from real riders on everything from helmets to boots. You can find top-rated products, compare options, and see what other riders recommend. Any specific gear you're interested in?";
  }
  
  // Events
  if (/event|meetup|rally|show|gathering/i.test(message)) {
    return "Check out our events calendar for local meetups, rallies, and group rides! You can filter by location, date, or type of event. You can also create and promote your own events to connect with the community. Any specific type of event you're looking for?";
  }
  
  // No match
  return null;
}

/**
 * Generates a response from Ghosty based on the user's message and conversation history
 * First tries basic pattern matching, then falls back to OpenAI API if available
 */
export async function getGhostyResponse(userMessage: string, conversationHistory: ChatMessage[] = []): Promise<string> {
  try {
    // First try to match with basic responses to avoid API calls
    const basicResponse = getBasicResponse(userMessage);
    if (basicResponse) {
      return basicResponse;
    }
    
    // For more complex conversations, or if we have conversation history, 
    // try to use the OpenAI API if possible
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
    } catch (apiError: any) {
      console.error('API error, falling back to default responses:', apiError);
      
      // If API fails, provide a more detailed fallback response based on the query
      if (/product|motorcycle|bike|model|brand/i.test(userMessage)) {
        return "We have a great selection of motorcycles and products in our database! You can browse by brand, type, or price range. Our most popular categories include sport bikes, cruisers, adventure bikes, and touring models. Can I help you find something specific?";
      }
      
      if (/review|rating|recommend|best/i.test(userMessage)) {
        return "Our community members have posted thousands of detailed reviews on motorcycles, gear, and accessories. The highest-rated items include the Ghost Rider helmet series, Phantom grip gloves, and our exclusive Spectral riding jackets. Looking for reviews on something specific?";
      }
      
      // Generic fallback
      return "I understand you're asking about " + userMessage.substring(0, 30) + "... That's a great topic! While I'm having some technical issues with my advanced systems, I'd be happy to help you find information about this in our navigation menu. Can you try asking in a different way or check out the relevant section on our site?";
    }
  } catch (error: any) {
    console.error('Error generating AI response:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return "Vroom! Sorry, my engine's running a bit rough today. Could you try asking again in a different way? If you're looking for specific information, try checking our menu sections for guidance!";
  }
}