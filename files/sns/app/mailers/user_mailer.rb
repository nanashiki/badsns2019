class UserMailer < ActionMailer::Base
  default from: 'info@badsns.com'

  def welcome
    @user = params[:user]
    @url = params[:url]
    mail(to: @user.email, subject: "BadSNSへようこそ！")
  end

  def password_reset
    @user = params[:user]
    @url = params[:url]
    @reset_token = params[:reset_token]
    mail(to: @user.email, subject: "パスワードをリセットされますか？")
  end
end
