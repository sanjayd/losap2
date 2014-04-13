class Standby < StationTime
  after_initialize :init
  
  def init
    self.deleted ||= false
    self.hours ||= (self.end_time - self.start_time) / 3600
  end
   
end
