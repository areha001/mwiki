package com.piggysnow.common.utils;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;

/**
 * 系统工具
 * 
 * @author <a href="mailto:qhuang@chinaschool.net">huangqiao</a>
 * 
 */
public class SystemUtils {
	/**
	 * 运行系统命令
	 * 
	 * @param command
	 *            系统命令
	 * @param envp
	 *            环境变量参数 array of strings, each element of which has environment
	 *            variable settings in the format <i>name</i>=<i>value</i>,
	 *            or <tt>null</tt> if the subprocess should inherit the
	 *            environment of the current process.
	 * @param args
	 *            需要输入的参数
	 * @return 所有的输出信息
	 * @throws IOException
	 */
	public static String runSysCommand(String[] command, String[] envp,
			String[] args) throws IOException {
		Process proc = Runtime.getRuntime().exec(command, envp);
		OutputStreamWriter osWriter = new OutputStreamWriter(proc
				.getOutputStream());
		if (args != null) {
			for (String str : args) {
				osWriter.write(str + "\n");
			}
		}
		osWriter.close();

		// 等待任务的完成，并打印信息
		InputStreamReader inReader = new InputStreamReader(proc
				.getInputStream());
		BufferedReader bufReader = new BufferedReader(inReader);
		StringBuffer allLine = new StringBuffer();
		String nextLine = null;
		while ((nextLine = bufReader.readLine()) != null) {
			System.out.println(nextLine);
			allLine.append(nextLine).append("\n");
		}
		bufReader.close();
		inReader.close();

		String returnValue = allLine.toString();
		return (returnValue.length() != 0) ? returnValue.substring(0,
				returnValue.length() - 1) : returnValue;// 去掉最后一个换行符
	}

	public static String runSysCommand(String command, String[] envp,
			String[] args) throws IOException {
		return SystemUtils.runSysCommand(new String[] { command }, envp, args);
	}
}
