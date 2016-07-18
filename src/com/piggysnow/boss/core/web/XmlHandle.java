package com.piggysnow.boss.core.web;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Iterator;
import java.util.List;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.input.SAXBuilder;
import org.jdom.output.XMLOutputter;
import org.jdom.xpath.XPath;

import com.piggysnow.boss.core.web.WebUtils;

public class XmlHandle {
	private String msXmlFileName = "";

	private String msXmlFilePath = "";

	private String msXmlFile = "";

	private File fileSource = null;

	private SAXBuilder sb = null;

	private Document doc = null;

	private Element root = null; // 得到根元素

	private String Encode = "GBK";

	// constructor
	public XmlHandle(String FilePath, String FileName) {
		if (stringNotNull(FilePath))
			this.msXmlFilePath = FilePath.trim();
		else
			this.msXmlFilePath = String.valueOf(String.valueOf(System
					.getProperty("user.dir")));
		this.msXmlFileName = FileName;
		this.msXmlFile = new StringBuffer(this.msXmlFilePath).append(
				File.separator).append(this.msXmlFileName).toString();
	}

	public XmlHandle(String FileFullPathName) {
		this.msXmlFile = FileFullPathName;
		this.msXmlFilePath = FileFullPathName.substring(0, FileFullPathName
				.lastIndexOf(File.separator));
		this.msXmlFileName = FileFullPathName.substring(FileFullPathName
				.lastIndexOf(File.separator) + 1, FileFullPathName.length());
	}

	/***************************************************************************
	 * 初始化XML文档
	 **************************************************************************/
	public void init() throws Exception {
		try {
			fileSource = new File(msXmlFile);
			if (fileSource.exists()) {
				sb = new SAXBuilder(); // 构件器
				doc = sb.build(new File(msXmlFile)); // 文档对象
				root = doc.getRootElement(); // 得到根元素
			} else {
				throw new Exception("No Xml File Found:" + msXmlFile);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (fileSource != null)
				fileSource = null;
		}
	}

	public String getXmlFile() {
		return this.msXmlFile;
	}

	/**
	 * 取的节点值，只取第一个
	 */
	public String getNodeText(String strSearchXpath) {
		String value = null;
		try {
			XPath xpath = XPath.newInstance(strSearchXpath);
			List list = xpath.selectNodes(root);
			Iterator iter = list.iterator();
			// System.out.println("Size:"+list.size());
			if (iter.hasNext()) {
				Element item = (Element) iter.next();
				value = item.getText();
				// System.out.println(item.getName()+":"+value) ;
			}
		} catch (Exception e) {
			// e.printStackTrace();
		}
		return value;
	}

	/**
	 * 设置节点值，只更改第一个
	 */
	public boolean setNodeText(String strSerachXpath, String strNewValue) {
		boolean value = false;
		try {
			XPath xpath = XPath.newInstance(strSerachXpath);
			List list = xpath.selectNodes(root);
			Iterator iter = list.iterator();
			if (iter.hasNext()) {// 更改第一个
				Element item = (Element) iter.next();
				if (!item.getText().equals(strNewValue))
					item.setText(strNewValue.trim());
				value = true;
			}

			XMLOutputter outputter = new XMLOutputter();
			org.jdom.output.Format format = org.jdom.output.Format
					.getPrettyFormat();
			format.setEncoding(Encode);
			outputter.setFormat(format);

			outputter.output(doc, new FileOutputStream(msXmlFile));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return value;
	}

	/**
	 * 取属性值
	 */
	public String getAttrValue(String strSearchXpath, String strAttribute) {
		String value = null;
		try {
			XPath xpath = XPath.newInstance(strSearchXpath);
			List list = xpath.selectNodes(root);
			Iterator iter = list.iterator();
			if (iter.hasNext()) {
				Element item = (Element) iter.next();
				value = item.getAttributeValue(strAttribute);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return value;
	}

	/**
	 * 设置属性
	 */
	public boolean setAttrValue(String strSearchXpath, String strAttrName,
			String strAttrValue) {
		boolean value = false;
		try {
			XPath xpath = XPath.newInstance(strSearchXpath);
			List list = xpath.selectNodes(root);
			Iterator iter = list.iterator();
			if (iter.hasNext()) {
				Element item = (Element) iter.next();
				item.removeAttribute(strAttrName);
				item.setAttribute(strAttrName, strAttrValue.trim());
			}

			XMLOutputter outputter = new XMLOutputter();
			org.jdom.output.Format format = org.jdom.output.Format
					.getPrettyFormat();
			format.setEncoding(Encode);
			outputter.setFormat(format);

			outputter.output(doc, new FileOutputStream(msXmlFile));
			value = true;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return value;
	}

	/**
	 * 设置属性
	 */
	public int getNodeCount(String strSearchXpath) {
		int value = 0;
		try {
			XPath xpath = XPath.newInstance(strSearchXpath);
			List list = xpath.selectNodes(root);
			return list.size();
		} catch (Exception e) {
			// e.printStackTrace();
			value = 0;
		}
		return value;
	}

	/**
	 * 取的节点文字数组
	 */
	public String[] getNodeTextArray(String strSearchXpath) {
		String[] rets = null;
		try {
			XPath xpath = XPath.newInstance(strSearchXpath);
			List list = xpath.selectNodes(root);
			if (list.size() == 0) {
				return null;
			}
			int index = 0;
			rets = new String[list.size()];
			Iterator iter = list.iterator();
			while (iter.hasNext()) {
				Element item = (Element) iter.next();
				rets[index] = item.getText();
				index++;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return rets;
	}

	public String[] getNodeAttrArray(String strSearchXpath, String type) {
		String[] rets = null;
		try {
			XPath xpath = XPath.newInstance(strSearchXpath);
			List list = xpath.selectNodes(root);
			if (list.size() == 0) {
				return null;
			}
			int index = 0;
			rets = new String[list.size()];
			Iterator iter = list.iterator();
			while (iter.hasNext()) {
				Element item = (Element) iter.next();
				rets[index] = item.getAttributeValue(type);
				index++;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return rets;
	}

	/**
	 * @return Returns the encode.
	 */
	public String getEncode() {
		return Encode;
	}

	/**
	 * @param encode
	 *            The encode to set.
	 */
	public void setEncode(String encode) {
		Encode = encode;
	}

	/*
	 * 功能：判断字符串是否为空
	 */
	public static boolean stringNotNull(String string) {
		return (string != null && string.trim().length() > 0) ? true : false;
	}

	
	public static void main(String[] args) {
		String xmlPath = WebUtils.getWebInfPath()+"/classes/gzycp.app3.xml";
		XmlHandle xmlFile = new XmlHandle(xmlPath);
		try {
			xmlFile.init();
		} catch (Exception e) {
			e.printStackTrace();
		}
		long time = System.currentTimeMillis();

		System.out.println("hostIp----" + xmlFile.getNodeText("/gzycp/hostIp"));
		System.out.println("hostPort----" + xmlFile.getNodeText("/gzycp/hostPort"));
		System.out.println("xmlrpc_path----" + xmlFile.getNodeText("/gzycp/xmlrpc/path"));
		System.out.println("id----" + xmlFile.getNodeText("/gzycp/product/id"));

		System.out.println(System.currentTimeMillis() - time);
	}
}
