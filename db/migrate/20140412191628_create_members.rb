class CreateMembers < ActiveRecord::Migration
  def change
    create_table :members do |t|
      t.string :firstname
      t.string :lastname
      t.string :badgeno
      
      t.index :firstname
      t.index :lastname
      t.index :badgeno

      t.timestamps
    end
  end
end
