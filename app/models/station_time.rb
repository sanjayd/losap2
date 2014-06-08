class StationTime < ActiveRecord::Base

  def self.find_by_month(params)
    month = Date.parse params[:month]
    StationTime.where(member_id: params[:member_id], date: [month.beginning_of_month .. month.end_of_month])
  end
  
  def self.totals(params)
    range = nil
    if params[:year]
      year = Date.parse params[:year]
      range = [year .. year.end_of_year]
    else
      month = Date.parse params[:month]
      range = [month .. month.end_of_month]
    end
    
    totals = StationTime.where(member_id: 1, date: range, deleted: false).group(:type).select(:type).count
    totals['SleepIn'] ||= 0
    totals['Standby'] ||= 0
    totals[:hours] = StationTime.where(member_id: 1, date: range, deleted: false).sum(:hours)
    totals
  end
end
