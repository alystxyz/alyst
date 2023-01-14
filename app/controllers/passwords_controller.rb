class PasswordsController < Devise::PasswordsController
  def new
    flash[:info] = 'Passwords are not open.'
    redirect_to root_path
  end

  def create
    flash[:info] = 'Passwords are not open.'
    redirect_to root_path
  end
end