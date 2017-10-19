package com.szcarshop.util;

import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

import com.demo.common.model.Apply;

import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;

public class ExcelUtil {
	public ExcelUtil() {

	}

	public void createExcel(OutputStream os, List<Apply> list)
			throws RowsExceededException, WriteException, IOException {
		// 创建工作薄
		WritableWorkbook workbook = Workbook.createWorkbook(os);
		// 创建新的一页
		WritableSheet sheet = workbook.createSheet("First Sheet", 0);
		// 创建要显示的内容,创建一个单元格，第一个参数为列坐标，第二个参数为行坐标，第三个参数为内容
		Label num = new Label(0, 0, "序号");
		sheet.addCell(num);
		Label time = new Label(1, 0, "入职时间");
		sheet.addCell(time);
		Label wages = new Label(2, 0, "实发工资");
		sheet.addCell(wages);
		Label dept = new Label(3, 0, "部门");
		sheet.addCell(dept);
		Label nickName = new Label(4, 0, "姓名");
		sheet.addCell(nickName);

		for (int i = 1; i < list.size(); i++) {
			Label numData = new Label(0, i, list.get(i).getId() + "");
			sheet.addCell(numData);
			Label timeData = new Label(1, i, list.get(i) + "");
			sheet.addCell(timeData);
			Label wagesData = new Label(2, i, list.get(i) + "");
			sheet.addCell(wagesData);
			Label deptData = new Label(3, i, list.get(i).getStr("name"));
			sheet.addCell(deptData);
			Label nickNameData = new Label(4, i, list.get(i).getStr("nickName"));
			sheet.addCell(nickNameData);
		}
		// 把创建的内容写入到输出流中，并关闭输出流
		workbook.write();
		workbook.close();
		os.close();
	}

}
