package com.piggysnow.common.utils;

import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;

import org.springframework.util.Assert;

/**
 * 常用工具类
 * 
 * @author <a href="mailto:qhuang@chinaschool.net">huangqiao</a>
 * 
 */
public class CommonUtils {
	public static byte[] parseByteArray(String target) throws IOException {
		ByteArrayOutputStream byteStream = new ByteArrayOutputStream();
		DataOutputStream dataStream = new DataOutputStream(byteStream);
		dataStream.writeUTF(target);
		dataStream.flush();
		return byteStream.toByteArray();
	}

	public static byte[] parseByteArray(Object obj) throws IOException {
		ByteArrayOutputStream byteStream = new ByteArrayOutputStream();
		ObjectOutputStream objStream = new ObjectOutputStream(byteStream);
		objStream.writeObject(obj);
		objStream.flush();
		return byteStream.toByteArray();
	}

	/**
	 * 写入文件
	 * 
	 * @param in
	 *            文件输入流
	 * @param outPath
	 *            输出文件路径
	 * @return 已上传文件的大小
	 * @throws IOException
	 */
	public static long fileWriteOut(InputStream in, String outPath)
			throws IOException {
		byte[] buf = new byte[1024];
		int length = 0;
		long fileSize = 0;
		OutputStream out = null;
		try {
			out = new BufferedOutputStream(new FileOutputStream(outPath));
			while ((length = in.read(buf)) > 0) {
				fileSize += length;
				out.write(buf, 0, length);
			}
		} catch (IOException e) {
			e.printStackTrace();
			throw e;
		} catch(Exception e){
			e.printStackTrace();
		}finally {
			in.close();
			out.close();
			in = null;
			out = null;
		}

		return fileSize;
	}

	/**
	 * 查看目录是否存在，若不存在则创建
	 * 
	 * @param dirPath
	 *            目录的路径
	 */
	public static void touchDir(String dirPath) {
		File dir = new File(dirPath);
		Assert.state(!dir.isFile(), "已存在同名的文件");
		if (!dir.isDirectory()) {
			dir.mkdirs();
		}
	}
}
