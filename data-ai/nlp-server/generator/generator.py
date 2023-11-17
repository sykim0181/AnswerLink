import openai
import json
from haystack.schema import Document
from typing import List

with open('security.json', 'r') as f:
    security = json.load(f)
    
openai.api_key = security['openai']
openai.organization = security["organization"]

PROMPT = "\"```\"안에 JSON으로 주어지는 문맥(`context`)으로부터 주어진 질문에 대한 답변을 합성하십시오."\
    "텍스트에 제시된 주요 요점과 정보를 요약하는 명확하고 간결한 응답을 제공하십시오."\
    "당신의 답변은 당신의 말로 이루어져야 하며 50 단어(100 tokens)를 넘지 않아야 합니다."\
    "문맥(`context`)에서 질문에 답할 수 없는 경우 '문맥에서 필요한 정보를 찾을 수 없습니다.'로 답하십시오."\
    "사용한 문맥들의 `url`과 `title`을 답변에 포함해서 작성해 주세요. `\\n - [제목](https://n.news.naver.com/mnews/article) (yyyy-mm-dd hh:MM:ss)`."\
    "`created at`이 큰 순서대로 확인하세요."\
    "\n\nContext:\n{context}\n;"\
    "Question: {query}"\
    "\n\nAnswer:"

def generate_openai(query: str, contexts: List[Document]):
    context = "```JSON\n["
    for document in contexts:
        context += "{\"context\": \"" + document.content + "\",\"title\": \"" + document.meta["title"] + "\",\"category\": \"" + document.meta["category"] + "\",\"created at\": \"" + document.meta["created"] + "\",\"url\": \"" + document.meta["url"] + "\"}\n"
    context += "]\n```"
    print(PROMPT.format(query=query, context=context))
     # openai의 GPT API를 사용하여 답변 생성
    response = openai.ChatCompletion.create(
            model = 'gpt-4-1106-preview',
            messages = [
                {'role': 'system', 'content': PROMPT.format(query=query, context=context)},
            ],
            temperature = 0,
            seed=1234,
            max_tokens = 600,
        )
    print(response)
    message = response.choices[0].message.content
    
    odqa_prompt = "당신은 질의응답 시스템 AIKU입니다. "\
                  "다음의 사용자 질의에 대한 답변을 생성하십시오. "\
                  "당신의 답변은 당신의 말로 이루어져야 하며 50 단어(100 tokens)를 넘지 않아야 합니다.\n\n"\
                  "질문: "
    # if messgae contain "문맥에서 필요한 정보를 찾을 수 없습니다."
    if "정보를 찾을 수 없습니다" in message:
        print(message)
        response = openai.ChatCompletion.create(
            model = 'gpt-4-1106-preview',
            messages = [
                {'role': 'system', 'content': odqa_prompt + query}
            ],
            temperature = 0,
            seed=1234,
            max_tokens = 300,
        )
        message = '●' + response.choices[0].message.content

    return message
