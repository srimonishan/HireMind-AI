# Interview Simulator - Setup Guide

## Getting Started

The Interview Simulator is an AI-powered mock interview platform that helps job seekers and students practice for real interviews with realistic questions and real-time feedback.

## How It Works

### Step 1: Home Page
- Visit `http://localhost:3000`
- Click "Start Interview" to begin the setup process

### Step 2: Interview Configuration (3-Step Setup)

#### Step 1/3 - Job Details
- Enter the **Job Title** you're interviewing for (e.g., "Senior Frontend Engineer")
- Select the **Interview Type**: Technical, Behavioral, or Mixed

#### Step 2/3 - Customize Interview
- Choose **Difficulty Level**: Beginner, Intermediate, or Advanced
- Adjust **Duration**: 5-60 minutes (default: 15 minutes)

#### Step 3/3 - OpenAI API Key
- Enter your **OpenAI API Key** (starts with `sk-`)
- The key is stored locally in your browser and never sent to our servers
- Get your API key: https://platform.openai.com/api-keys

### Step 3: Start Interview
- Click "Start Interview" to begin
- The AI interviewer will ask you technical/behavioral questions
- Answer each question in the text area
- Click "Send Answer" to submit your response
- The AI will analyze your answer and ask follow-up questions

### Step 4: Real-Time Scoring
- **Communication**: How well you express your thoughts
- **Technical**: Depth and accuracy of technical knowledge
- **Confidence**: Clarity and conviction in your answers
- Scores update as you answer each question

### Step 5: Results & Improvement Plan
- View your overall score and category breakdown
- Get an AI-generated personalized improvement plan
- Download your report or retry the interview

## Features

- **Dynamic Questions**: AI generates contextual follow-up questions based on your answers
- **Real-Time Scoring**: Get instant feedback on communication, technical skills, and confidence
- **Professional UI**: Modern command center aesthetic with smooth animations
- **Secure**: Your OpenAI API key is stored locally and never sent to our servers
- **Customizable**: Choose job role, difficulty, and interview duration

## Setting Up OpenAI API

1. Go to https://platform.openai.com/api-keys
2. Create a new API key
3. Copy the key (starts with `sk-`)
4. Paste it in Step 3 of the Interview Setup
5. Click "Start Interview"

## Model Used

- **gpt-4o-mini**: Fastest and most cost-effective option for mock interviews
- Temperature: 0.7 (balanced between creativity and consistency)
- Max tokens per response: 150

## Environment

This application runs entirely on the client side:
- No backend server needed
- No data is stored on our servers
- Your API key and interview data stay on your device
- All processing happens directly with OpenAI's API

## Troubleshooting

### "Invalid API key format"
- Make sure your OpenAI API key starts with `sk-`
- Check that you've copied the entire key

### "API error: 401"
- Your API key is invalid or expired
- Generate a new key at https://platform.openai.com/api-keys

### "Failed to get AI response"
- Check your internet connection
- Verify your OpenAI account has available credits
- Ensure your API key has permission to use the chat completions API

## Tips for Best Results

1. **Be Specific**: Provide detailed answers with examples
2. **Think Out Loud**: Explain your reasoning and problem-solving approach
3. **Ask Clarifications**: Just like in real interviews, you can ask for clarification
4. **Practice Different Roles**: Try different job titles and difficulty levels
5. **Review Results**: Check your improvement plan after each interview

## Privacy & Security

- Your OpenAI API key is stored only in your browser's localStorage
- Interview transcripts are not stored persistently
- Configuration is cleared after each interview
- No personal data is collected or tracked

Enjoy practicing! 🚀
