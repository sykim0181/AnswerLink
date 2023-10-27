import openai
import json
from haystack.schema import Document
from typing import List

with open('security.json', 'r') as f:
    security = json.load(f)
    
openai.api_key = security['openai']

PROMPT = "다음 문맥(Context)으로부터 주어진 질문에 대한 답변을 합성하십시오."\
    "텍스트에 제시된 주요 요점과 정보를 요약하는 명확하고 간결한 응답을 제공하십시오."\
    "당신의 답변은 당신의 말로 이루어져야 하며 50 단어(100 tokens)를 넘지 않아야 합니다."\
    "문맥(Context)에서 질문에 답할 수 없는 경우 '문맥에서 필요한 정보를 찾을 수 없습니다.'로 답하십시오."\
    "\n\nContext:{context};"\
    "Question: {query}"\
    "\n\nAnswer:"

def generate_openai(query: str, contexts: List[Document]):
    context = "```\n"
    for document in contexts:
        if len(context) > 2500:
            break
        context += "text: " + document.content + "\ntitle: " + document.meta["title"] + "\ncategory: " + document.meta["category"] + "\ncreated at: " + document.meta["created"] + "\n"
    context += "```"
    
     # openai의 GPT-3 API를 사용하여 답변 생성
    response = openai.ChatCompletion.create(
            model = 'gpt-4',
            messages = [
                {'role': 'system', 'content': PROMPT.format(query=query, context=context)},
            ],
            temperature = 0,
            max_tokens = 250,
        )
    
    message = response.choices[0].message.content

    return message
