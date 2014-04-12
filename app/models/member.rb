class Member < ActiveRecord::Base
  validates_presence_of :firstname
  validates_presence_of :lastname
  validates_presence_of :badgeno

  def self.find_by_pattern(pattern)
    self.where('firstname like :pattern or lastname like :pattern or badgeno like :pattern',
      {pattern: "#{pattern}%"})
  end
end
