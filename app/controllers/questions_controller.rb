class QuestionsController < ApplicationController
  before_action :authenticate_user!

  def new
    @question = Question.new
  end

  def create
    @question = Question.new(question_params)
    @question.user_id = current_user.id
    if @question.save
      redirect_to questions_path, notice: "The question has been successfully created."
    else
      render action: "new"
    end
  end

  def index
    @questions = Question.where(user_id: current_user.id).order("created_at DESC")
  end

  private

  def question_params
    params.require(:question).permit(:title, :content)
  end
end
