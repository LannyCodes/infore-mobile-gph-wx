/**
 * Created by Lanny on 2018/1/8.
 */
import httpPost from '../../../../core/api/baseRequest'
import Urls from './url.js'

export const getVoteActivityList = (self, params, successCallback, failCallback, handleError) => {
  httpPost(self, Urls.getVoteActivityList, params, successCallback, failCallback, handleError)
};

export const getVoteActivityDetail = (self, params, successCallback, failCallback, handleError) => {
  httpPost(self, Urls.getVoteActivityDetail, successCallback, failCallback, handleError)
};
