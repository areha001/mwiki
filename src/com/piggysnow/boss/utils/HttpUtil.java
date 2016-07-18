package com.piggysnow.boss.utils;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.http.HttpEntity;
import org.apache.http.ParseException;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.apache.log4j.Logger;
import org.junit.Test;

public class HttpUtil {
	
	static Logger log = Logger.getLogger(HttpUtil.class);
	
	@Test
	public void jUnitTest3() {
		String url = "http://192.168.50.159:8280/eee/admin/adminLogin.do?method=genJs&groupType=RAX";
		System.out.println(get(url));
	}
	
	@Test
	public void jUnitTest2() {
		//String url = "http://localhost:8280/eee/feedback.do?method=submitFeedback";
		String url = "http://192.168.50.159:8280/eee/feedback.do?method=submitFeedback";
		Map<String, String> paramsMap = new HashMap<String, String>();
		 paramsMap = new HashMap<String, String>();
			paramsMap.put("serverId", "100");
			paramsMap.put("playerId", "1000000001832");
			paramsMap.put("nickName", "鲍洁");
			paramsMap.put("info","ssssssssssssssssssssss");
		System.out.println(post(url, paramsMap));
	}
	

	@Test
	public void jUnitTest() {
	//	get();
	//	String url = "http://192.168.50.159:8280/eee/account.do";
		String url = "http://ddp.piggysnow.com:8980/account.do";
		Map<String, String> paramsMap = new HashMap<String, String>();
		paramsMap.put("method", "login");
		paramsMap.put("username", "2002");
		paramsMap.put("publishChannel", "ios");
		paramsMap.put("imei", "imei");
		paramsMap.put("terminal", "terminal");
		paramsMap.put("terminalDetail", "terminalDetail");

		System.out.println(post(url, paramsMap));


		
//		 paramsMap = new HashMap<String, String>();
//			paramsMap.put("method", "fastLogin");
//			paramsMap.put("username", "aa");
//			paramsMap.put("publishChannel", "ios");
//			paramsMap.put("imei", "imei");
//			paramsMap.put("terminal", "terminal");
//			paramsMap.put("terminalDetail", "terminalDetail");
//			paramsMap.put("accountId", "342");
//			paramsMap.put("token", "3414713632850611687");
//
//		System.out.println(post(url, paramsMap));
		
	}

	/**
	 * HttpClient连接SSL
	 
	public void ssl() {
		CloseableHttpClient httpclient = null;
		try {
			KeyStore trustStore = KeyStore.getInstance(KeyStore.getDefaultType());
			FileInputStream instream = new FileInputStream(new File("d:\\tomcat.keystore"));
			try {
				// 加载keyStore d:\\tomcat.keystore  
				trustStore.load(instream, "123456".toCharArray());
			} catch (CertificateException e) {
				e.printStackTrace();
			} finally {
				try {
					instream.close();
				} catch (Exception ignore) {
				}
			}
			// 相信自己的CA和所有自签名的证书
			SSLContext sslcontext = SSLContexts.custom().loadTrustMaterial(trustStore, new TrustSelfSignedStrategy()).build();
			// 只允许使用TLSv1协议
			SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(sslcontext, new String[] { "TLSv1" }, null,
					SSLConnectionSocketFactory.BROWSER_COMPATIBLE_HOSTNAME_VERIFIER);
			httpclient = HttpClients.custom().setSSLSocketFactory(sslsf).build();
			// 创建http请求(get方式)
			HttpGet httpget = new HttpGet("https://localhost:8443/myDemo/Ajax/serivceJ.action");
			System.out.println("executing request" + httpget.getRequestLine());
			CloseableHttpResponse response = httpclient.execute(httpget);
			try {
				HttpEntity entity = response.getEntity();
				System.out.println("----------------------------------------");
				System.out.println(response.getStatusLine());
				if (entity != null) {
					System.out.println("Response content length: " + entity.getContentLength());
					System.out.println(EntityUtils.toString(entity));
					EntityUtils.consume(entity);
				}
			} finally {
				response.close();
			}
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (KeyManagementException e) {
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (KeyStoreException e) {
			e.printStackTrace();
		} finally {
			if (httpclient != null) {
				try {
					httpclient.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
*/
	/**
	 * post方式提交表单（模拟用户登录请求）
	 */
	/*
	public void postForm() {
		// 创建默认的httpClient实例.  
		CloseableHttpClient httpclient = HttpClients.createDefault();
		// 创建httppost  
		HttpPost httppost = new HttpPost("http://localhost:8280/eee/account.do?method=login");
		// 创建参数队列  
		List formparams = new ArrayList();
		formparams.add(new BasicNameValuePair("username", "aa"));
		formparams.add(new BasicNameValuePair("publishChannel", "ios"));
		UrlEncodedFormEntity uefEntity;
		try {
			uefEntity = new UrlEncodedFormEntity(formparams, "UTF-8");
			httppost.setEntity(uefEntity);
			System.out.println("executing request " + httppost.getURI());
			CloseableHttpResponse response = httpclient.execute(httppost);
			try {
				HttpEntity entity = response.getEntity();
				if (entity != null) {
					System.out.println("--------------------------------------");
					System.out.println("Response content: " + EntityUtils.toString(entity, "UTF-8"));
					System.out.println("--------------------------------------");
				}
			} finally {
				response.close();
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			// 关闭连接,释放资源  
			try {
				httpclient.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	*/
	
	/**
	 * 发送 post请求访问本地应用并根据传递参数不同返回不同结果
	 */

	public static String postString(String url,String s) {
		// 创建默认的httpClient实例.  
		CloseableHttpClient httpclient = HttpClients.createDefault();
		// 创建httppost  
		HttpPost httppost = new HttpPost(url);
		// 创建参数队列  
		StringEntity uefEntity;
		try {
			uefEntity = new StringEntity(s, "UTF-8");
			httppost.setEntity(uefEntity);
		//	System.out.println("executing request " + httppost.getURI());
			CloseableHttpResponse response = httpclient.execute(httppost);
			try {
				HttpEntity entity = response.getEntity();
				if (entity != null) {
					return  EntityUtils.toString(entity, "UTF-8");
				}
			} finally {
				response.close();
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			// 关闭连接,释放资源  
			try {
				httpclient.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return "";
	}
	
	
	/**
	 * 发送 post请求访问本地应用并根据传递参数不同返回不同结果
	 */

	public static String post(String url, Map<String, String> paramsMap) {
		// 创建默认的httpClient实例.  
		CloseableHttpClient httpclient = HttpClients.createDefault();
		// 创建httppost  
		HttpPost httppost = new HttpPost(url);
		// 创建参数队列  
		List formparams = new ArrayList();
		for(String key :paramsMap.keySet()){
			formparams.add(new BasicNameValuePair(key, paramsMap.get(key)));
		}
		UrlEncodedFormEntity uefEntity;
		try {
			uefEntity = new UrlEncodedFormEntity(formparams, "UTF-8");
			httppost.setEntity(uefEntity);
		//	System.out.println("executing request " + httppost.getURI());
			CloseableHttpResponse response = httpclient.execute(httppost);
			try {
				HttpEntity entity = response.getEntity();
				if (entity != null) {
					return  EntityUtils.toString(entity, "UTF-8");
				}
			} finally {
				response.close();
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			// 关闭连接,释放资源  
			try {
				httpclient.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return "";
	}
	

	/**
	 * 发送 get请求
	 */
	public static String get(String url) {
		CloseableHttpClient httpclient = HttpClients.createDefault();
		try {
			// 创建httpget.  
			HttpGet httpget = new HttpGet(url);
			//System.out.println("executing request " + httpget.getURI());
			// 执行get请求.  
			CloseableHttpResponse response = httpclient.execute(httpget);
			try {
				// 获取响应实体  
				HttpEntity entity = response.getEntity();
			
				//System.out.println(response.getStatusLine());
				if (entity != null) {
					return EntityUtils.toString(entity);
				}
			} finally {
				response.close();
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (ParseException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			// 关闭连接,释放资源  
			try {
				httpclient.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return "";
	}

	/**
	 * 上传文件
	 */
	public static void upload(String url , String filePath) {
		CloseableHttpClient httpclient = HttpClients.createDefault();
		try {
			HttpPost httppost = new HttpPost(url);

			FileBody bin = new FileBody(new File(filePath));
			StringBody comment = new StringBody("A binary file of some kind", ContentType.TEXT_PLAIN);

			HttpEntity reqEntity = MultipartEntityBuilder.create().addPart("Filedata", bin).addPart("comment", comment).build();

			httppost.setEntity(reqEntity);

			System.out.println("executing request " + httppost.getRequestLine());
			CloseableHttpResponse response = httpclient.execute(httppost);
			try {
				System.out.println("----------------------------------------");
				System.out.println(response.getStatusLine());
				HttpEntity resEntity = response.getEntity();
				if (resEntity != null) {
					System.out.println("Response content length: " + resEntity.getContentLength());
				}
				EntityUtils.consume(resEntity);
			} finally {
				response.close();
			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				httpclient.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}