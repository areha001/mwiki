package com.piggysnow.exception;

/**
 * 磁盘已被使用异常
 * 
 * @author <a href="mailto:qhuang@chinaschool.net">黄桥</a><br>
 * @since 2007-11-14
 */
public class DiskIsUsedException extends RuntimeException {
	private static final long serialVersionUID = 1818712359023312032L;

	public DiskIsUsedException() {
	}

	public DiskIsUsedException(String message) {
		super(message);
	}

	public DiskIsUsedException(Throwable cause) {
		super(cause);
	}

	public DiskIsUsedException(String message, Throwable cause) {
		super(message, cause);
	}

}
