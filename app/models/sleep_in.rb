class SleepIn < StationTime
  validates_presence_of :member_id
  validates_presence_of :date
  validates_presence_of :unit
  
  after_validation :init

  def init
    self.deleted ||= false
    self.hours ||= 12
  end
    
end
