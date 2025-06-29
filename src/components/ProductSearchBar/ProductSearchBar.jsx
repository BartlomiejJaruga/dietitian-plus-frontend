import { useState, useEffect, useRef } from 'react';
import styles from './ProductSearchBar.module.scss';

export default function ProductSearchBar({ productsData, fontSize, onProductSelect }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const containerRef = useRef(null);
    const inputRef = useRef(null);
    const itemsRef = useRef([]);

    const handleInputClick = () => {
        if(searchTerm === "") return;
        
        const filtered = productsData.filter(product =>
            product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredProducts(filtered);
        setIsDropdownOpen(true);
    }

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setHighlightedIndex(-1);

        if (value.trim() === '') {
            setFilteredProducts([]);
            setIsDropdownOpen(false);
            return;
        }

        const filtered = productsData.filter(product =>
            product.product_name.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredProducts(filtered);
        setIsDropdownOpen(true);
    };

    const handleSelect = (product) => {
        setSearchTerm(product.product_name);
        setFilteredProducts([]);
        setIsDropdownOpen(false);
        setHighlightedIndex(-1);
        onProductSelect?.(product.product_id);
    };

    const handleKeyDown = (e) => {
        if (!isDropdownOpen || filteredProducts.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setHighlightedIndex((prev) => (prev + 1) % filteredProducts.length);
                break;
            case 'ArrowUp':
                e.preventDefault();
                setHighlightedIndex((prev) =>
                    prev <= 0 ? filteredProducts.length - 1 : prev - 1
                );
                break;
            case 'Enter':
                e.preventDefault();
                if (highlightedIndex >= 0) {
                    handleSelect(filteredProducts[highlightedIndex]);
                }
                break;
            case 'Escape':
                setIsDropdownOpen(false);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (
            highlightedIndex >= 0 &&
            highlightedIndex < itemsRef.current.length &&
            itemsRef.current[highlightedIndex]
        ) {
            itemsRef.current[highlightedIndex].scrollIntoView({
                block: 'nearest',
                behavior: 'smooth',
            });
        }
    }, [highlightedIndex]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
                setHighlightedIndex(-1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.main_container} style={{ fontSize }} ref={containerRef}>
            <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onClick={handleInputClick}
                placeholder="Search product..."
                className={styles.search_input}
            />
            {isDropdownOpen && (
                <ul className={styles.dropdown_list}>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                            <li
                                key={product.product_id}
                                ref={(el) => (itemsRef.current[index] = el)}
                                onClick={() => handleSelect(product)}
                                className={`${styles.dropdown_item} ${index === highlightedIndex ? styles.highlighted : ''}`}
                            >
                                {product.product_name}
                            </li>
                        ))
                    ) : (
                        <li className={styles.dropdown_no_results}>No results</li>
                    )}
                </ul>
            )}
        </div>
    );
}
