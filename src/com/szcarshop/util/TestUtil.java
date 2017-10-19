package com.szcarshop.util;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class TestUtil {
	private int begin;
	private int end;

	public int getBegin() {
		return begin;
	}

	public void setBegin(int begin) {
		this.begin = begin;
	}

	public int getEnd() {
		return end;
	}

	public void setEnd(int end) {
		this.end = end;
	}

	public TestUtil() {

	}

	public TestUtil(int begin, int end) {
		super();
		this.begin = begin;
		this.end = end;
	}

	public static int[][] getContinuousNumber(int[] array) {
		int[][] arrays = new int[array.length][array.length];
		int i = 0;
		int j = 0;
		int max = array[0] - 1;
		for (int k = 0; k < array.length; k++) {
			if (array[k] != max + 1) {
				i++;
				j = 0;
				max = array[k] - 1;
			}
			arrays[i][j] = array[k];
			max = array[k];
			j++;
		}
		return arrays;
	}

	public static List<TestUtil> getGroups(int[][] arr) {
		List<TestUtil> list = new ArrayList<TestUtil>();
		int t = arr.length - 1;
		while (t >= 0) {
			if (arr[t][0] != 0) {
				break;
			}
			t--;
		}
		for (int r = 0; r <= t; r++) {
			int m = arr[r].length - 1;
			while (m >= 0) {
				if (arr[r][m] != 0) {
					break;
				}
				m--;
			}
			if (m != -1) {
				TestUtil tu = new TestUtil(arr[r][0], arr[r][m]);
				list.add(tu);
			}
		}
		return list;
	}

	public static List<TestUtil> getList(int[] array) {
		return getGroups(getContinuousNumber(array));
	}

	public static void main(String[] args) {
		int[] array = { -1, 0, 1, 2, 3, 4, 9, 10, 11, 12, 13, 14, 15, 17 };
		System.out.println("当前数组：" + Arrays.toString(array));
		for (TestUtil t : getList(array)) {
			System.out.println("beginNum:" + t.getBegin());
			System.out.println("endNum:" + t.getEnd());
		}
	}
}
