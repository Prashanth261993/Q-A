class TagsController < ApplicationController
  before_action :authenticate_user!

  def index
    @topics = Topic.take(10)
    @tags = current_user.tags
  end

  def update_user
    unless params[:topics_to_be_added].present? || params[:topics_to_be_removed].present?
      render :json => { status: false, message: 'Wrong params sent'} and return
    end

    topic_ids_to_be_tagged = params[:topics_to_be_added].map(&:to_i) if params[:topics_to_be_added]

    if topic_ids_to_be_tagged.present?
      build_topics_to_be_added = []


      topic_ids_to_be_tagged.each do |topic_id|
        build_topics_to_be_added << {topic_id: topic_id, user_id: current_user.id}
      end

      Tag.create(build_topics_to_be_added)
    end

    if params[:topics_to_be_removed].present?
      topic_ids_to_be_removed = params[:topics_to_be_removed].map(&:to_i)
      Tag.where(topic_id: topic_ids_to_be_removed, user_id: current_user.id).destroy_all
    end

    render :json => {status:true, message:'Congratz! Topics you follow are updated'} and return

    rescue Exception => e
      if Rails.env.development?
        render :json =>  { status: false, message: e.message}
      else
        render :json => {status: false, message: 'Something went wrong. Ask Prashanth he will fix it for you'}.to_json and return
      end

  end
end