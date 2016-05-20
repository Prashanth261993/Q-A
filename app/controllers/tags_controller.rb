class TagsController < ApplicationController
  before_action :authenticate_user!

  def index
    @topics = Topic.take(10)
    @tags = current_user.tags

  end
end