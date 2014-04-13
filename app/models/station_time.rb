class StationTime < ActiveRecord::Base

  def self.find_by_month(params)
    month = Date.parse params[:month]
    StationTime.where(member_id: params[:member_id], date: [month.beginning_of_month .. month.end_of_month])
  end
end
