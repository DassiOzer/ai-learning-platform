import { Request, Response } from 'express';
import { Prompt } from '../models/prompt';
// import openai from '../services/openaiService'; // נוסיף אחר כך

export const createPrompt = async (req: Request, res: Response) => {
  try {
    const { user_id, category_id, sub_category_id, prompt } = req.body;
    
    // כרגע נוסיף תגובה מוכנה - נחליף באינטגרציה עם OpenAI
    const response = `This is a mock response for: ${prompt}`;
    
    const newPrompt = new Prompt({
      user_id,
      category_id,
      sub_category_id,
      prompt,
      response
    });
    
    await newPrompt.save();
    res.status(201).json(newPrompt);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create prompt' });
  }
};

export const getUserPrompts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const prompts = await Prompt.find({ user_id: userId })
      .populate('category_id')
      .populate('sub_category_id')
      .sort({ created_at: -1 });
    res.json(prompts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user prompts' });
  }
};