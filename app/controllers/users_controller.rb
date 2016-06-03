class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    unless current_user.tags.present?
      redirect_to tags_path
    end
  end

  def profile

  end

  def update_profile
    source_params = params[:user].permit(:first_name, :last_name, :age, :profile_picture)
    @user  = User.find(current_user.id)
    @user.first_name = source_params[:first_name]
    @user.last_name = source_params[:last_name]
    @user.age = source_params[:age]
    @user.profile_picture = source_params[:profile_picture]
    if @user.save
      redirect_to profile_users_path, notice: "Your profile has been successfully updated."
    else
      redirect_to profile_users_path, notice: "Something went wrong"
    end
  end
end