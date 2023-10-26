from typing import Annotated
from fastapi import FastAPI, Header, HTTPException

import json

with open('security.json', 'r') as f:
    security = json.load(f)
    
app = FastAPI()

def check_auth(serviceKey:str | None = None, Authorization: Annotated[str | None, Header()] = None):
    '''
        check service key in database.
    '''
    if serviceKey == None and Authorization == None:
        raise HTTPException(status_code=404, detail="required Authorization")
    
    if serviceKey == None:
        serviceKey = Authorization
        
    if serviceKey in security['service-key']:
        raise HTTPException(status_code=404, detail='invalid serviceKey')


@app.get("/chat")
async def chat(query:str, serviceKey:str | None = None, Authorization: Annotated[str | None, Header()] = None):
    '''
        make answer from query.
        :param query: question string
        :param serviceKey(str, option): authorization key
        :param Authorization(str, option): authorization key
        
        if serviceKey and Authorization is None, raise HTTPException
        
        -> return json {
            "query": query,
            "contexts": contexts, # List[Document]
            "answers": answers
            }
    '''    
    check_auth(serviceKey, Authorization)
    
    contexts = "retrieved context"
    answers = "generated answer"
    
    return {
        "query": query,
        "contexts": contexts,
        "answers": answers
        }
