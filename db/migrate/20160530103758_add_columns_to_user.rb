class AddColumnsToUser < ActiveRecord::Migration
  def up
    add_column :users, :first_name, :string, :null => false
    add_column :users, :last_name, :string
    add_column :users, :age, :integer
    add_attachment :users, :profile_picture
  end

  def down
    remove_column :users, :first_name
    remove_column :users, :last_name
    remove_column :users, :age, :integer
    remove_attachment :users, :profile_picture
  end
end
