package com.piggysnow.exception;

/**
 * 磁盘空间不足异常
 * 
 * @author <a href="mailto:qhuang@chinaschool.net">黄桥</a><br>
 * @since 2007-11-13
 */
public class DiskSpaceNotEnoughException extends RuntimeException {
	private static final long serialVersionUID = -7597996394749680354L;

	public DiskSpaceNotEnoughException() {
	}

	public DiskSpaceNotEnoughException(String message) {
		super(message);
	}

	public DiskSpaceNotEnoughException(Throwable cause) {
		super(cause);
	}

	public DiskSpaceNotEnoughException(String message, Throwable cause) {
		super(message, cause);
	}

}
