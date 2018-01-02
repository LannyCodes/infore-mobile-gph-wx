import httpPost from '../../../../core/api/baseRequest'
import Urls from './urls'

export const getRiverChiefList = function(self,params,successCallback,failCallBack,handleError){
  httpPost(self,Urls.getRiverChiefList,params,successCallback,failCallBack,handleError)
};
export const getRiverChiefDetail = function(self,params,successCallback,failCallBack,handleError){
  httpPost(self,Urls.getRiverChiefDetail,params,successCallback,failCallBack,handleError)
};
