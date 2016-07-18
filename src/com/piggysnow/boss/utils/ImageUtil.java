package com.piggysnow.boss.utils;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileOutputStream;

import com.sun.image.codec.jpeg.JPEGCodec;
import com.sun.image.codec.jpeg.JPEGImageEncoder;

/**
 * 提供给外围组件Step的操作服务
 * */
public class ImageUtil {

	public static final int FILE_NOT_EXISITS = 2;
	public static final int FILE_TRANS_ERROR = 1;
	public static final int FILE_TRANS_OK = 3;

	/**
	 * 缩放文件
	 * 
	 * @param imgsrc图片源路径
	 * @param imgdist图片存放新路径
	 * @param widthdist
	 * @param heightdist
	 */
	public static int reduceImg(String imgsrc, String imgdist, int widthdist,
			int heightdist) {
		try {
			File srcfile = new File(imgsrc);
			if (!srcfile.exists()) {
				return FILE_NOT_EXISITS;
			}
			Image src = javax.imageio.ImageIO.read(srcfile);
			BufferedImage tag = new BufferedImage((int) widthdist,
					(int) heightdist, BufferedImage.TYPE_INT_RGB);
			tag.getGraphics().drawImage(
					src.getScaledInstance(widthdist, heightdist,
							Image.SCALE_SMOOTH), 0, 0, null);
			FileOutputStream out = new FileOutputStream(imgdist);
			JPEGImageEncoder encoder = JPEGCodec.createJPEGEncoder(out);
			encoder.encode(tag);
			out.close();
			return FILE_TRANS_OK;

		} catch (Exception ex) {
			ex.printStackTrace();
			return FILE_TRANS_ERROR;
		}
	}
	public static void main(String[] args) {
		try {
			//System.out.println(getUploadPath("ss"));
			reduceImg("d:/abc.jpg", "d:/abcd.gif", 50, 60);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
