package com.ymt.testplatform.service.stress.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ymt.testplatform.dao.BaseDAO;
import com.ymt.testplatform.entity.StressResult;
import com.ymt.testplatform.entity.StressTask;
import com.ymt.testplatform.entity.StressTaskNameInfo;
import com.ymt.testplatform.service.stress.StressService;
import com.ymt.testplatform.util.Utils;


@Service("stressService")
public class StressServiceImpl implements StressService {

	@Resource
	private BaseDAO<StressTask> stressTaskDAO;
	
	@Resource
	private BaseDAO<StressResult> stressResultDAO;


	// StressTask
	@Override
	public StressTask findStressTaskById(int id){
		return stressTaskDAO.get("from StressTask where id = ? and del=0", new Object[] { id });
	}
	
	@Override
	public void saveStressTask(StressTask stressTask) {
		stressTaskDAO.save(stressTask);
	}

	@Override
	public void updateStressTask(StressTask stressTask) {
		stressTaskDAO.update(stressTask);
	}

	@Override
	public void deleteStressTask(StressTask stressTask) {
		stressTaskDAO.delete(stressTask);
	}

	@Override
	public List<StressTask> findAllStressTasks(Integer pageIndex, Integer pageSize, Map<String, Object> map, Integer departmentid){	
		String queryString = " where s.del = 0 ";
		queryString = Utils.getQueryString(queryString, map);
		if(departmentid!=null){
			queryString += " and s.application.department.id = " + departmentid;
		}
		queryString = queryString + " order by createtime desc";
		return stressTaskDAO.findByHql(" from StressTask s" + queryString, map, pageSize, pageIndex);
	}
	
	@Override
	public List<StressTaskNameInfo> findAllStressTaskNames(){	
		String queryString = "select id,title from StressTask order by createtime desc";
		List<Map> maps = stressTaskDAO.findBySqlReturnMap(queryString,null);
		
		List<StressTaskNameInfo> tasks = new ArrayList<StressTaskNameInfo>();
		
		for (Map map : maps) {
			StressTaskNameInfo info = new StressTaskNameInfo();
			info.setId(Integer.parseInt(map.get("id").toString()));
			info.setTitle(map.get("title").toString());		
			
			tasks.add(info);
		}

		return tasks;
	}
	
	@Override
	public Long findStressTaskPages(Integer pageSize, Map<String, Object> map, Integer departmentid){
		String queryString = " where s.del = 0 ";
		queryString = Utils.getQueryString(queryString, map);
		if(departmentid!=null){
			queryString += " and s.application.department.id = " + departmentid;
		}
		String hql = "select count(*) from StressTask s" + queryString;
		Long pages = stressTaskDAO.count(hql, map);
		if(pages%pageSize!=0){
			pages = pages/pageSize + 1;
		}else{
			pages = pages/pageSize;
		}
		return pages;
	}
	
	public List<StressResult> findAllStressResultGroupByApplicationid(Integer applicationid, Integer departmentid, Integer pageIndex, Integer pageSize){
		String hql = "from StressResult s where s.del = 0 ";
		if(applicationid!=null){
			hql += " and s.stressTask.application.id = " + applicationid;
		}
		if(departmentid!=null){
			hql += " and s.stressTask.application.department.id = " + departmentid;
		}
		hql += " group by s.stressTask.application.id";
		return stressResultDAO.findByHql(hql, null, pageSize, pageIndex);
	}
	
	public Long findStressApplicationsPages(Integer pageSize, Integer applicationid, Integer departmentid){
		String hql = "select count(distinct s.stressTask.application.id) from StressResult s where s.del = 0";
		if(applicationid!=null){
			hql += " and s.stressTask.application.id = " + applicationid;
		}
		if(departmentid!=null){
			hql += " and s.stressTask.application.department.id = " + departmentid;
		}
		//hql += " group by t.application.id";
		Long pages = stressResultDAO.count(hql);
		if(pages%pageSize!=0){
			pages = pages/pageSize + 1;
		}else{
			pages = pages/pageSize;
		}
		return pages;
	}
	
	public Long getStressUrlCountByApplicationId(Integer applicationid){
		String queryString = " where s.del = 0 and s.stressTask.application.id =" + applicationid ;
		String hql = "select count(*) from StressResult s" + queryString;
		return stressResultDAO.count(hql);
	}
	
	public List<StressResult> findStressResultsByApplicationId(Integer applicationId){
		return stressResultDAO.find("from StressResult s where s.stressTask.application.id = " + applicationId);
	}
	
	// StressResult
	@Override
	public void saveStressResult(StressResult stressResult) {
		stressResultDAO.save(stressResult);
	}

	@Override
	public void updateStressResult(StressResult stressResult) {
		stressResultDAO.update(stressResult);
	}

	@Override
	public void deleteStressResult(StressResult stressResult) {
		stressResultDAO.delete(stressResult);
	}

	@Override
	public StressResult findStressResultById(int id){
		return stressResultDAO.get("from StressResult where id = ? and del=0", new Object[] { id });
	}
	
	@Override
	public List<StressResult> findStressResultsByStressTask(Integer stresstaskid){	
		return stressResultDAO.find("from StressResult where stresstaskid = ? and del=0", new Object[] { stresstaskid });
	}
	
	
}
