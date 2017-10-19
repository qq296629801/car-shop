package com.szcarshop.util;

import java.io.UnsupportedEncodingException;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.NoSuchProviderException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.internet.MimeUtility;

/**
 * 邮件发送工具类
 * 
 * @author Administrator
 * 
 */
public class SendEmailUtil {

	Message message;
	Session session;
	String fromAddress = "amyhi_mail@163.com";
	String emalHost = "smtp.163.com";
	String pwd = "eajdzmkaqnukaxpi";
	private Multipart multipart;

	public SendEmailUtil() {
		// 配置参数
		Properties props = new Properties();
		props.put("mail.smtp.host", emalHost);// 指定SMTP服务器
		props.put("mail.smtp.auth", "true");// 指定是否需要SMTP验证

		// 新建一个对话
		session = Session.getDefaultInstance(props);
		session.setDebug(false);

		// 新建一个消息
		message = new MimeMessage(session);
		try {
			message.setFrom(new InternetAddress(fromAddress));
		} catch (AddressException e) {
			e.printStackTrace();
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		// 新建一个装内容的大盒子
		multipart = new MimeMultipart();
	}

	/**
	 * 专用于发送文本
	 * 
	 * @param subject
	 *            主题
	 * @param text
	 *            文本
	 * @param recAddress
	 *            接收地址
	 */
	public void sendText(String subject, String text, String[] recAddress) {
		try {
			message.setSubject(subject);
			// 新建一个小盒子
			BodyPart dp = new MimeBodyPart();
			dp.setContent(text, "text/plain;charset=GB2312");
			for (String addr : recAddress) {
				message.addRecipient(Message.RecipientType.TO, new InternetAddress(addr));
			}
			// 将小盒子放到大盒子中去
			multipart.addBodyPart(dp);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 专用于发送文本
	 * 
	 * @param subject
	 *            主题
	 * @param text
	 *            html 内容
	 * @param recAddress
	 *            接收地址
	 */
	public void sendHtml(String subject, String htmlContent, String[] recAddress) {
		try {
			message.setSubject(subject);
			// 新建一个小盒子
			BodyPart dp = new MimeBodyPart();
			dp.setContent(
					"<html><body>" + htmlContent
							+ "<br/><a href='http://www.amyhi.com'><img src='http://www.amyhi.com/logo.png'/></a></body></html>",
					"text/html;charset=utf-8");
			for (String addr : recAddress) {
				message.addRecipient(Message.RecipientType.TO, new InternetAddress(addr));
			}
			// 将小盒子放到大盒子中去
			multipart.addBodyPart(dp);
		} catch (MessagingException e) {
			e.printStackTrace();
		}

	}

	/**
	 * 添加附件
	 * 
	 * @param path
	 *            附件的路径
	 */
	public void addAdjunct(String path) {

		BodyPart dp = new MimeBodyPart();
		// 创建数据源
		FileDataSource fds = new FileDataSource(path);
		// 得到数据句柄
		DataHandler dh = new DataHandler(fds);

		// 取文件名
		int start = path.lastIndexOf("\\");
		int end = path.length();
		String name = path.substring(start, end);

		// 组装
		try {
			dp.setFileName((MimeUtility.encodeText(name, "UTF-8", "B")));
			dp.setDataHandler(dh);
			// 将小盒子放大盒子内面
			multipart.addBodyPart(dp);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}

	public void sendEmail() {
		try {
			// 将内容的大盒子加到邮件中
			message.setContent(multipart);
			Transport ts = session.getTransport("smtp");
			ts.connect(emalHost, fromAddress, pwd);
			ts.sendMessage(message, message.getAllRecipients());
			ts.close();
		} catch (NoSuchProviderException e) {
			e.printStackTrace();
		} catch (MessagingException e) {
			e.printStackTrace();
		}

	}

	public static void main(String[] args) {
		SendEmailUtil s = new SendEmailUtil();
		s.sendText("test", "测试一下邮箱", new String[] { "393922808@qq.com" });
		s.sendEmail();
	}
}
