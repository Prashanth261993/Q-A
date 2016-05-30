class UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    unless current_user.tags.present?
      redirect_to tags_path
    end
  end

  def profile

  end
end