class StationTimesController < ApplicationController
  expose(:sleep_in, attributes: :sleep_in_params)
  expose(:standby, attributes: :standby_params)
  expose(:station_time, attributes: :station_time_params)

  def create_sleep_in
    if sleep_in.save
      render status: :created, json: ''
    else
      render json: sleep_in.errors
    end
  end
  
  def create_standby
    if standby.save
      render status: :created, json: ''
    else
      render json: sleep_in.errors
    end
  end
  
  def index
    render json: StationTime.find_by_month(member_id: params[:member_id], month: params[:month])
  end
  
  def update
    if station_time.save
      render status: :created, json: ''
    else
      render json: station_time.errors
    end
  end
  
  private
  def sleep_in_params
    params.require(:sleep_in).permit(:member_id, :date, :unit)
  end
  
  def standby_params
    params.require(:standby).permit(:member_id, :date, :start_time, :end_time)
  end
  
  def station_time_params
    params.require(:station_time).permit(:deleted)
  end
end
