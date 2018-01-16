import httpPost from '../../../../core/api/baseRequest'
import Urls from './urls'

export const getKnowledgeList = function (self, params, successCallback, failCallBack, handleError) {
  httpPost(self,Urls.getKnowledgeList, params, successCallback, failCallBack, handleError)
};

export const getKnowledgeDetail = function (self, params, successCallback, failCallBack, handleError) {
  httpPost(self,Urls.getKnowledgeDetail, params, successCallback, failCallBack, handleError)
};
