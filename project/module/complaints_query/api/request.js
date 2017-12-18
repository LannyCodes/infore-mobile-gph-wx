import httpPost from '../../../../core/api/baseRequest'
import Urls from './urls'

export const requestMainData = function (self, params, successCallback, failCallBack, handleError) {
  httpPost(self, Urls.mainData, params, successCallback, failCallBack, handleError)
};
