class StandbyDatetimes < ActiveRecord::Migration
  def change
    change_column :station_times, :start_time, :datetime
    change_column :station_times, :end_time, :datetime
  end
end