import httpPost from '../../../../core/api/baseRequest'
import Urls from './urls'

export const getWaterOpenList = function (self, params, successCallback, failCallBack, handleError) {
  httpPost(self, Urls.getWaterOpenList, params, successCallback, failCallBack, handleError)
};

export const getWaterOpenDetail = function (self, params, successCallback, failCallBack, handleError) {
  httpPost(self, Urls.getWaterOpenDetail, params, successCallback, failCallBack, handleError)
};

export const getRainDistributionList = function(self,params,successCallback,failCallBack,handleError){
  httpPost(self,Urls.getRainDistributionList,params,successCallback,failCallBack,handleError)
};

export const getRainDistributionDetail = function(self,params,successCallback,failCallBack,handleError){
  httpPost(self,Urls.getRainDistributionDetail,params,successCallback,failCallBack,handleError)
};