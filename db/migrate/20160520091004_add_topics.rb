class AddTopics < ActiveRecord::Migration

  def up
    create_table :topics do |t|
      t.string :name, :null => false, :unique => true
      t.timestamps
    end
    add_index :topics, :name
  end

  def down
    if table_exists?(:topics)
      remove_index :topics, :name if index_exists? :topics, :name
      drop_table :topics
  end

  end

end
