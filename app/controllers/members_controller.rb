class MembersController < ApplicationController
  expose :member

  def show
    render json: member
  end
  
  def index
    render json: Member.find_by_pattern(params[:pattern])
  end
end
