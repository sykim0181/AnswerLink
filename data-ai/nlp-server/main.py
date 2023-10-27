from typing import Annotated
from fastapi import FastAPI, Header, HTTPException

import json

import bareunpy as brn

from retriever.retriever import *

with open('security.json', 'r') as f:
    security = json.load(f)
    
app = FastAPI()
tagger = brn.Tagger(apikey=security['bareun'],
                    host=security['bareun-host'],
                    port=security['bareun-port']
                    )

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
    
    # get response from bareu api
    res = tagger.tag([query])
    # remove unnecessary pos
    pos = [i[0] for i in res.pos()
            if i[1] in ['SL', 'SH', 'SN',  
                        #SL: 외국어 # SH: 한자 # SN: 숫자
                        'NNP', 'NNG', 'NNB', 'NR',
                        # NNP: 고유명사 # NNG: 일반명사 # NNB: 의존명사 # NR: 수사
                        'VV', 'VA', 'VX', 'VCP', 'VCN',
                        # VV: 동사 # VA: 형용사 # VX: 보조용언 # VCP: 긍정지정사 # VCN: 부정지정사
                        'XR'
                        # XR: 어근
                        ]
           ]

    contexts = retrieve(query)
    answers = "generated answer"
    
    return {
        "query": query,
        "contexts": contexts,
        "answers": answers,
        "pos": pos,
        }

@app.get("/tag")
async def tag(query:str, serviceKey:str | None = None, Authorization: Annotated[str | None, Header()] = None) -> dict:
    """_summary_

    Args:
        query (str): _description_
        serviceKey (str | None, optional): _description_. Defaults to None.
        Authorization (Annotated[str  |  None, Header, optional): _description_. Defaults to None.

    Returns:
        retrun pos, nouns, verbs using baren api
    """
    
    check_auth(serviceKey, Authorization)
    
    res = tagger.tags([query])
    nowns = res.nouns()
    verbs = res.verbs()
    
    return {"query": query, "serviceKey": serviceKey, 'tagged': res.pos(),'nouns': nowns, 'verbs': verbs}
