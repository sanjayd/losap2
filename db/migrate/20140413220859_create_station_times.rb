class CreateStationTimes < ActiveRecord::Migration
  def change
    create_table :station_times do |t|
      # Base StationTime fields
      t.string :type
      t.integer :member_id
      t.date :date
      t.float :hours
      t.boolean :deleted

      t.index :type
      t.index :member_id
      t.index :date

      # Standby fields
      t.time :start_time
      t.time :end_time
      
      # Sleep-In fields
      t.string :unit

      t.timestamps
    end
  end
end
