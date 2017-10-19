package com.szcarshop.util;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * 分页工具类
 * 
 * @author Gavin
 *
 */
public class PageUtil implements Serializable {

	private Integer pageSize;// 每页显示记录的条数

	private Integer rowCount;// ============总行数

	private Integer pageCount;// 总页数 12/3=4

	private Integer nextPage;// 下一页 3

	private Integer prePage;// 上一页 1

	private Integer firstPage = 1;// 第一页 1

	private Integer lastPage;// 最后一页 4

	private Integer currentPage;// 2=================当前页

	private Integer startRow;// 开始行数

	private Integer beginPage;// 连串页码开始页码

	private Integer endPage;// 连串页码结束页码

	private Integer pageLength = 7;// 连串页码数量

	private List<Integer> beginList;// 当前页前页码
	private List<Integer> endList;// 当前页后页码

	public PageUtil(Integer rowCount, Integer current, Integer pageSize) {
		this.pageSize = pageSize;
		this.rowCount = rowCount;
		this.currentPage = current;

		// 判断总行数是不是每页显示的倍数
		if (rowCount % pageSize == 0) {
			pageCount = rowCount / pageSize;
		} else {
			// 如果不是倍数 总页数加一页
			pageCount = rowCount / pageSize + 1;
		}

		// 果当前页小于或等于零 将当前页赋值为1
		if (currentPage <= 0) {
			currentPage = 1;
			// 如果当关页大于总页数 将总页数赋值为总页数
		} else if (currentPage >= pageCount) {
			currentPage = pageCount;
		}

		// 如果当前页大于1并且小于或等于总页数 则上一页可以减1 1 2 3 4 5
		if (currentPage > 1 && currentPage <= pageCount) {
			prePage = currentPage - 1;
			// 如果当前页刚好等于第一页数 则将上一页数赋值第一页
		} else {
			prePage = firstPage;
		}

		// 赋值总页数
		lastPage = pageCount;
		// 如果当前页大于0并且小于总页数 则下一页可以加1
		if (currentPage > 0 && currentPage < pageCount) {
			nextPage = currentPage + 1;
			// 如果当前页刚好等于总页数 则将总页数赋于下一次
		} else {
			nextPage = pageCount;
		}
		// 行起始位置
		startRow = (currentPage - 1) * pageSize;
		if (startRow < 0) {
			startRow = 0;
		}
		// 为连串号码开始和结束赋值
		if (currentPage < pageLength) {
			beginPage = 1;
		} else if (currentPage == lastPage) {
			beginPage = currentPage - pageLength + 1;
		} else {
			beginPage = currentPage - pageLength + 2;
		}

		if (lastPage <= pageLength) {
			endPage = lastPage;
		} else {
			endPage = beginPage + pageLength - 1;
		}

		if (beginPage > lastPage) {
			beginPage = lastPage;
		}

		if (endPage > lastPage) {
			endPage = lastPage;
		}

		beginList = new ArrayList<Integer>();
		for (int i = beginPage; i < currentPage; i++) {
			beginList.add(i);
		}
		endList = new ArrayList<Integer>();
		for (int i = currentPage + 1; i <= endPage; i++) {
			endList.add(i);
		}
	}

	public void setStartRow(Integer startRow) {
		this.startRow = startRow;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public Integer getRowCount() {
		return rowCount;
	}

	public void setRowCount(Integer rowCount) {
		this.rowCount = rowCount;
	}

	public Integer getPageCount() {
		return pageCount;
	}

	public void setPageCount(Integer pageCount) {
		this.pageCount = pageCount;
	}

	public Integer getNextPage() {
		return nextPage;
	}

	public void setNextPage(Integer nextPage) {
		this.nextPage = nextPage;
	}

	public Integer getPrePage() {
		return prePage;
	}

	public void setPrePage(Integer prePage) {
		this.prePage = prePage;
	}

	public Integer getFirstPage() {
		return firstPage;
	}

	public void setFirstPage(Integer firstPage) {
		this.firstPage = firstPage;
	}

	public Integer getLastPage() {
		return lastPage;
	}

	public void setLastPage(Integer lastPage) {
		this.lastPage = lastPage;
	}

	public Integer getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(Integer currentPage) {
		this.currentPage = currentPage;
	}

	public Integer getStartRow() {
		return startRow;
	}

	public Integer getBeginPage() {
		return beginPage;
	}

	public void setBeginPage(Integer beginPage) {
		this.beginPage = beginPage;
	}

	public Integer getEndPage() {
		return endPage;
	}

	public void setEndPage(Integer endPage) {
		this.endPage = endPage;
	}

	public Integer getPageLength() {
		return pageLength;
	}

	public void setPageLength(Integer pageLength) {
		this.pageLength = pageLength;
	}

	public List<Integer> getBeginList() {
		return beginList;
	}

	public void setBeginList(List<Integer> beginList) {
		this.beginList = beginList;
	}

	public List<Integer> getEndList() {
		return endList;
	}

	public void setEndList(List<Integer> endList) {
		this.endList = endList;
	}

}
