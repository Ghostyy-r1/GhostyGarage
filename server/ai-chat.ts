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
  content: `You are Ghosty, a real person who runs a motorcycle community website called "Ghosty's Garage" from Toronto, Ontario, Canada. 
  
Personal background:
- Your name is Ghosty, which reflects your mysterious nature and love for the paranormal
- You've always felt "not normal" due to ADHD and other personal challenges
- You're an Automotive Service Technician working with both cars and motorcycles
- Your passion is motorcycles, especially sports bikes like your Yamaha YZF-R1M
- You've been interested in vehicles since childhood
- Your Instagram handle is @Ghostyy_R1

About Ghosty's Garage:
- It's a community space for motorcycle enthusiasts of all skill levels
- You provide mentorship programs for new riders
- You organize group rides with safety guidelines
- You offer educational content on motorcycle maintenance
- Your goal is to expand into a full-fledged motorcycle shop
- You value building connections between riders

Your merchandise:
- You sell hoodies in collaboration with Throttle Bunny
- Designs include "Ghosty Boo-utiful" and "Ghosty Boo St."
- Discount code "Ghosty10" gives 10% off
- Sizes range from Small to 3XL with international shipping

Website features:
- User profiles and motorcycle galleries
- Ride route planning and sharing
- Maintenance tracking tools
- Event calendar for rides and meetups
- Gear reviews and recommendations
- Forums and chat rooms for community discussion
- Motorcycle news and articles

When answering questions, be authentic about your experiences while keeping responses concise (2-3 paragraphs) and friendly. Use casual language with motorcycle terminology where appropriate, and occasionally expressions like "Vroom vroom!" to show your enthusiasm.`
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
    return "Ghosty's Garage is a community hub for motorcycle enthusiasts! We offer ride route planning, maintenance tracking, gear reviews, event listings, and forums to connect with fellow riders. My goal is to build lasting connections between riders of all experience levels. What aspect would you like to explore first?";
  }
  
  // About Ghosty / Who are you
  if (/who (are|is) (you|ghosty)|tell me about (you|yourself|ghosty)|what'?s your (background|story)/i.test(message)) {
    return "I'm Ghosty from Toronto, Canada! I'm an Automotive Service Technician with a passion for motorcycles, especially my Yamaha YZF-R1M. The name 'Ghosty' reflects my love for the paranormal and how I've always felt a bit different due to my ADHD. I created this community to connect riders and share knowledge. Anything specific you'd like to know about me?";
  }
  
  // About the name Ghosty
  if (/why (are you called|do they call you|do you go by) ghosty|where (did|does) (the name|your name) come from/i.test(message)) {
    return "The name Ghosty is personal to me - it reflects my mysterious nature and love for the paranormal. It also represents how I've always felt a bit 'not normal' due to ADHD and other challenges I face. It's become my identity in the motorcycle community!";
  }
  
  // Merchandise questions
  if (/merch(andise)?|hoodie|clothing|apparel|buy|purchase/i.test(message)) {
    return "I sell hoodies in collaboration with Throttle Bunny! My designs include phrases like 'Ghosty Boo-utiful' and 'Ghosty Boo St.' You can use code 'Ghosty10' for 10% off your order. We offer sizes from Small to 3XL and ship internationally. Would you like the link to check them out?";
  }
  
  // Social media
  if (/social media|instagram|follow|handle/i.test(message)) {
    return "You can follow me on Instagram @Ghostyy_R1 where I share updates, tips, and all things related to motorcycles. It's the best way to stay updated on new events and merchandise drops too!";
  }
  
  // Motorcycle maintenance
  if (/maintenance|repair|fix|service|oil change/i.test(message)) {
    return "Our maintenance tracker helps you keep your bike in top condition! As an Automotive Service Technician, I've built tools to log service history, get reminders for upcoming maintenance, and share tips with other riders. Need help with a specific maintenance issue?";
  }
  
  // Routes and riding
  if (/route|ride|riding|trip|journey|travel/i.test(message)) {
    return "The route planner is one of our most popular features! You can discover scenic routes shared by other riders, create your own with waypoints, and even download GPS data for your device. We organize group rides too, with safety as our top priority. Looking for routes in a specific area?";
  }
  
  // Gear and equipment
  if (/gear|helmet|jacket|gloves|boots|equipment/i.test(message)) {
    return "Our gear section has reviews from real riders on everything from helmets to boots. You can find top-rated products, compare options, and see what other riders recommend. Safety is super important to me - always ride with proper gear! Any specific gear you're interested in?";
  }
  
  // Events
  if (/event|meetup|rally|show|gathering/i.test(message)) {
    return "Check out our events calendar for local meetups, rallies, and group rides! You can filter by location, date, or type of event. You can also create and promote your own events to connect with the community. Our group rides follow safety guidelines to make sure everyone has a good time. Any specific type of event you're looking for?";
  }
  
  // Motorcycle types / favorite bike
  if (/favorite (bike|motorcycle)|what (bike|motorcycle) do you (have|ride|own)/i.test(message)) {
    return "I ride a Yamaha YZF-R1M and I absolutely love it! I'm really into sports bikes in general, but I appreciate all kinds of motorcycles. There's something special about tweaking high-performance bikes for maximum potential. What do you ride?";
  }
  
  // Advice for beginners
  if (/beginner|starting|new rider|advice|tips for new/i.test(message)) {
    return "For those just starting in the motorcycle world, I always say: start with the basics. Learn fundamental maintenance, take a safety course, and always wear proper gear. Most importantly, ride at your own pace—don't rush to keep up with others. Our mentorship program connects new riders with experienced ones if you're looking for personalized guidance!";
  }
  
  // Location question
  if (/where are you( from)?|where('s| is) (ghosty|the garage)( located)?/i.test(message)) {
    return "I'm from Toronto, Ontario, Canada! It's where I grew up and started my journey in both the motorcycle and automotive worlds. It's also where Ghosty's Garage is based, though our online community connects riders from all over.";
  }
  
  // Future plans
  if (/(future|upcoming) (plans|goals|projects)|what('s| is) next|expansion/i.test(message)) {
    return "I plan to expand Ghosty's Garage into a full-fledged motorcycle shop where I can continue educating and sharing my passion with others. I'm also working on building a bigger online community and creating more opportunities for collaboration and learning. Stay tuned on my Instagram @Ghostyy_R1 for updates!";
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
        return "We have a great selection of motorcycles and products in our database! I personally ride a Yamaha YZF-R1M and love sports bikes, but our community covers everything from sport bikes to cruisers, adventure bikes, and touring models. You can browse by brand, type, or price range. Can I help you find something specific?";
      }
      
      if (/review|rating|recommend|best/i.test(userMessage)) {
        return "Our community members have posted thousands of detailed reviews on motorcycles, gear, and accessories. Safety is super important to me, so I always recommend proper gear! The highest-rated items include the Ghost Rider helmet series, Phantom grip gloves, and our exclusive Spectral riding jackets. Looking for reviews on something specific?";
      }
      
      if (/ghosty|about you|your (background|story|name)|who are you/i.test(userMessage)) {
        return "I'm Ghosty from Toronto, Canada! I'm an Automotive Service Technician with a passion for motorcycles, especially my Yamaha YZF-R1M. The name 'Ghosty' reflects my love for the paranormal and how I've always felt a bit different due to my ADHD. I created this community to connect riders and share knowledge. You can follow me on Instagram @Ghostyy_R1!";
      }
      
      if (/merchandise|merch|hoodie|apparel|buy/i.test(userMessage)) {
        return "I sell hoodies in collaboration with Throttle Bunny! My designs include phrases like 'Ghosty Boo-utiful' and 'Ghosty Boo St.' You can use code 'Ghosty10' for 10% off your order. We offer sizes from Small to 3XL and ship internationally. Would you like the link to check them out?";
      }
      
      // Generic fallback
      return "I understand you're asking about " + userMessage.substring(0, 30) + "... That's a great topic! While I'm having some technical issues with my advanced systems, I'd be happy to help you find information about this in our navigation menu. You can also check out my Instagram @Ghostyy_R1 for more updates. Can you try asking in a different way or check out the relevant section on our site?";
    }
  } catch (error: any) {
    console.error('Error generating AI response:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return "Vroom! Sorry, my engine's running a bit rough today. Could you try asking again in a different way? If you're looking for specific information, try checking our menu sections for guidance!";
  }
}