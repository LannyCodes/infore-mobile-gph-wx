import httpPost from '../../../../core/api/baseRequest'
import Urls from './urls'

export const getWaterOpenList = function (self, params, successCallback, failCallBack, handleError) {
  httpPost(self, Urls.getWaterOpenList, params, successCallback, failCallBack, handleError)
};
