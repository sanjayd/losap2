class SleepIn < StationTime
  after_initialize :init

  def init
    self.deleted ||= false
    self.hours ||= 12
  end
    
end
