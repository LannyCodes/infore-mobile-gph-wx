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

export const getRiverChiefList = function(self,params,successCallback,failCallBack,handleError){
  httpPost(self,Urls.getRiverChiefList,params,successCallback,failCallBack,handleError)
};
export const getRiverChiefDetail = function(self,params,successCallback,failCallBack,handleError){
  httpPost(self,Urls.getRiverChiefDetail,params,successCallback,failCallBack,handleError)
};
