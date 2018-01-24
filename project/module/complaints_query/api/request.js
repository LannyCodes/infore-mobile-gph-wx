import httpPost from '../../../../core/api/baseRequest'
import Urls from './urls'

export const getComplaintsQueryList = function (self, params, successCallback, failCallBack, handleError) {
  httpPost(self, Urls.getComplaintsQueryList, params, successCallback, failCallBack, handleError)
};
export const getComplaintsQueryDetail = function (self, params, successCallback, failCallBack, handleError) {
  httpPost(self, Urls.getComplaintsQueryDetail, params, successCallback, failCallBack, handleError)
};

