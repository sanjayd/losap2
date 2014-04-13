class Standby < StationTime
  validates_presence_of :member_id
  validates_presence_of :date
  validates_presence_of :start_time
  validates_presence_of :end_time

  after_validation :init
  
  def init
    self.deleted ||= false
    self.hours ||= (self.end_time - self.start_time) / 3600
  end
   
end
